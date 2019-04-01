import org.gnu.glpk.GLPK;
import org.gnu.glpk.GLPKConstants;
import org.gnu.glpk.GlpkException;
import org.gnu.glpk.SWIGTYPE_p_double;
import org.gnu.glpk.SWIGTYPE_p_int;
import org.gnu.glpk.glp_prob;
import org.gnu.glpk.glp_smcp;

public class Motor {
	private static glp_prob lp;
	private static glp_smcp parm;
    private static SWIGTYPE_p_int ind;
    private static SWIGTYPE_p_double val;
    private static double constraintsValues[] = {0,0,0,0,0,0,0,0,0,0,0,0,0,0};
    private static String cakesNames[] = {
    		"boloCenouraCalda",
    		"boloCenoura",
    		"boloChocolateCalda",
    		"boloChocolate",
    		"boloMexerica",
    		"boloLaranja",
    		"boloFuba",
    		"boloLimao",
    		"boloBanana"
    		};
    private static double cakeCost[] = {0,0,0,0,0,0,0,0,0};
    
    // Create problem
    public static void createProblem(String problem_name) {
        lp = GLPK.glp_create_prob();
        GLPK.glp_set_prob_name(lp, problem_name);
        System.out.println("The problem " + problem_name + " was created");
    }
    
    // Calculate problem result
    public static int calculateResult() {
    	return GLPK.glp_simplex(lp, parm);
    }
    
    // Delete problem to free memory
    public static void deleteProblem(glp_prob lp) {
        GLPK.glp_delete_prob(lp);
    }
    
    // Define columns
    public static void defineColumns() {
    	int nColumns = cakesNames.length;
    	
        GLPK.glp_add_cols(lp, nColumns);
        for(int i = 0, column = 1; i < nColumns; i++, column++) {
            GLPK.glp_set_col_name(lp, column, cakesNames[i]);
            GLPK.glp_set_col_kind(lp, column, GLPKConstants.GLP_CV);
            GLPK.glp_set_col_bnds(lp, column, GLPKConstants.GLP_LO, 0, 0);
        }
    }
    
    // Set constraints values according to user constraints values
    public static void setConstraintsValues(double userConstraintsValues[]) {
    	for(int i = 0; i < constraintsValues.length; i++) {
    		constraintsValues[i] = userConstraintsValues[i];
    	}
    }
    
    public static void defineConstraints() {
        SWIGTYPE_p_int ind2 = GLPK.new_intArray(9);
        SWIGTYPE_p_double val2 = GLPK.new_doubleArray(9);
        
        ind = GLPK.new_intArray(9);
        val = GLPK.new_doubleArray(9);
    
        
    	// Create constraints
        /* 
         * R1:  (Farinha de trigo |  g): 360*boloCenouraCalda + 240*boloCenoura + 240*boloChocolateCalda + 
         * 240*boloChocolate + 360*boloMexerica + 360*boloLaranja + 360*boloFuba + 240*boloLimao + 
         * 240*boloBanana <= qtdFarinha
         * */
        GLPK.glp_add_rows(lp, 14);
        GLPK.glp_set_row_name(lp, 1, "Farinha de trigo");
        GLPK.glp_set_row_bnds(lp, 1, GLPKConstants.GLP_DB, 0, constraintsValues[0]);
        GLPK.intArray_setitem(ind, 1, 1);
        GLPK.intArray_setitem(ind, 2, 2);
        GLPK.intArray_setitem(ind, 3, 3);
        GLPK.intArray_setitem(ind, 4, 4);
        GLPK.intArray_setitem(ind, 5, 5);
        GLPK.intArray_setitem(ind, 6, 6);
        GLPK.intArray_setitem(ind, 7, 7);
        GLPK.intArray_setitem(ind, 8, 8);
        GLPK.intArray_setitem(ind, 9, 9);
        GLPK.doubleArray_setitem(val, 1, 360);
        GLPK.doubleArray_setitem(val, 2, 240);
        GLPK.doubleArray_setitem(val, 3, 240);
        GLPK.doubleArray_setitem(val, 4, 240);
        GLPK.doubleArray_setitem(val, 5, 360);
        GLPK.doubleArray_setitem(val, 6, 360);
        GLPK.doubleArray_setitem(val, 7, 360);
        GLPK.doubleArray_setitem(val, 8, 240);
        GLPK.doubleArray_setitem(val, 9, 240);
        GLPK.glp_set_mat_row(lp, 1, 9, ind, val);
        
        /*
         * R2:  (Açucar refinado | g): 400*boloCenouraCalda + 300*boloCenoura + 300*boloChocolateCalda + 
         * 400*boloChocolate + 360*boloMexerica + 400*boloLaranja + 400*boloFuba + 400*boloLimao + 
         * 5000*boloBanana <= qtdAcucarRefinado
         * */
        GLPK.glp_set_row_name(lp, 1, "Acucar refinado");
        GLPK.glp_set_row_bnds(lp, 1, GLPKConstants.GLP_DB, 0, constraintsValues[1]);
        GLPK.intArray_setitem(ind, 1, 1);
        GLPK.intArray_setitem(ind, 2, 2);
        GLPK.intArray_setitem(ind, 3, 3);
        GLPK.intArray_setitem(ind, 4, 4);
        GLPK.intArray_setitem(ind, 5, 5);
        GLPK.intArray_setitem(ind, 6, 6);
        GLPK.intArray_setitem(ind, 7, 7);
        GLPK.intArray_setitem(ind, 8, 8);
        GLPK.intArray_setitem(ind, 9, 9);
        GLPK.doubleArray_setitem(val, 1, 400);
        GLPK.doubleArray_setitem(val, 2, 300);
        GLPK.doubleArray_setitem(val, 3, 300);
        GLPK.doubleArray_setitem(val, 4, 400);
        GLPK.doubleArray_setitem(val, 5, 360);
        GLPK.doubleArray_setitem(val, 6, 400);
        GLPK.doubleArray_setitem(val, 7, 400);
        GLPK.doubleArray_setitem(val, 8, 400);
        GLPK.doubleArray_setitem(val, 9, 5000);
        GLPK.glp_set_mat_row(lp, 2, 9, ind, val);
        
        /*
         * R3:  (Leite | ml): 1000*x2 + 300*x3 + 400*x4 + 360*x5 + 400*x6 + 400*x7 + 400*x8 + 5000*x9 <= qtdLeite 
         * */
        GLPK.glp_set_row_name(lp, 1, "Leite");
        GLPK.glp_set_row_bnds(lp, 1, GLPKConstants.GLP_DB, 0, constraintsValues[2]);
        GLPK.intArray_setitem(ind, 1, 2);
        GLPK.intArray_setitem(ind, 2, 3);
        GLPK.intArray_setitem(ind, 3, 4);
        GLPK.intArray_setitem(ind, 4, 5);
        GLPK.intArray_setitem(ind, 5, 6);
        GLPK.intArray_setitem(ind, 6, 7);
        GLPK.intArray_setitem(ind, 7, 8);
        GLPK.intArray_setitem(ind, 8, 9);
        GLPK.doubleArray_setitem(val, 1, 1000);
        GLPK.doubleArray_setitem(val, 2, 300);
        GLPK.doubleArray_setitem(val, 3, 400);
        GLPK.doubleArray_setitem(val, 4, 360);
        GLPK.doubleArray_setitem(val, 5, 400);
        GLPK.doubleArray_setitem(val, 6, 400);
        GLPK.doubleArray_setitem(val, 7, 400);
        GLPK.doubleArray_setitem(val, 8, 5000);
        GLPK.glp_set_mat_row(lp, 3, 8, ind, val);
        
        /*
         * R4:  (Ovos | un): 4*x1 + 5*x2 + 5*x3 + 4*x4 + 4*x9 <= qtdLeite 
         * */
        GLPK.glp_set_row_name(lp, 1, "Ovos");
        GLPK.glp_set_row_bnds(lp, 1, GLPKConstants.GLP_DB, 0, constraintsValues[3]);
        GLPK.intArray_setitem(ind, 1, 1);
        GLPK.intArray_setitem(ind, 2, 2);
        GLPK.intArray_setitem(ind, 3, 3);
        GLPK.intArray_setitem(ind, 4, 4);
        GLPK.intArray_setitem(ind, 5, 9);
        GLPK.doubleArray_setitem(val, 1, 4);
        GLPK.doubleArray_setitem(val, 2, 5);
        GLPK.doubleArray_setitem(val, 3, 5);
        GLPK.doubleArray_setitem(val, 4, 4);
        GLPK.doubleArray_setitem(val, 5, 4);
        GLPK.glp_set_mat_row(lp, 4, 5, ind, val);
        
        /*
         * R5:  (Cenouras | g): 340*x5 + 340*x6 <= qtdCenouras 
         * */
        GLPK.glp_set_row_name(lp, 1, "Cenouras");
        GLPK.glp_set_row_bnds(lp, 1, GLPKConstants.GLP_DB, 0, constraintsValues[4]);
        GLPK.intArray_setitem(ind, 1, 5);
        GLPK.intArray_setitem(ind, 2, 6);
        GLPK.doubleArray_setitem(val, 1, 340);
        GLPK.doubleArray_setitem(val, 2, 340);
        GLPK.glp_set_mat_row(lp, 2, 2, ind, val);
        
        /*
         * R6:  (Banana caturra | un): 6*x1 <= qtdBanana
         * */
        GLPK.glp_set_row_name(lp, 1, "Banana");
        GLPK.glp_set_row_bnds(lp, 1, GLPKConstants.GLP_DB, 0, constraintsValues[5]);
        GLPK.intArray_setitem(ind, 1, 1);
        GLPK.doubleArray_setitem(val, 1, 6);
        GLPK.glp_set_mat_row(lp, 6, 1, ind, val);
        
        /*
         * R7:  (Fermento |  g): 15*x1 + 15*x2 + 15*x3 + 15*x4 + 15*x5 + 15*x6 + 15*x7 + 15*x8 + 15*x9 <= qtdFermento
         * */
        GLPK.glp_set_row_name(lp, 1, "Fermento");
        GLPK.glp_set_row_bnds(lp, 1, GLPKConstants.GLP_DB, 0, constraintsValues[6]);
        GLPK.intArray_setitem(ind, 1, 1);
        GLPK.intArray_setitem(ind, 2, 2);
        GLPK.intArray_setitem(ind, 3, 3);
        GLPK.intArray_setitem(ind, 4, 4);
        GLPK.intArray_setitem(ind, 5, 5);
        GLPK.intArray_setitem(ind, 6, 6);
        GLPK.intArray_setitem(ind, 7, 7);
        GLPK.intArray_setitem(ind, 8, 8);
        GLPK.intArray_setitem(ind, 8, 9);
        GLPK.doubleArray_setitem(val, 1, 15);
        GLPK.doubleArray_setitem(val, 2, 15);
        GLPK.doubleArray_setitem(val, 3, 15);
        GLPK.doubleArray_setitem(val, 4, 15);
        GLPK.doubleArray_setitem(val, 5, 15);
        GLPK.doubleArray_setitem(val, 6, 15);
        GLPK.doubleArray_setitem(val, 7, 15);
        GLPK.doubleArray_setitem(val, 8, 15);
        GLPK.doubleArray_setitem(val, 9, 15);
        GLPK.glp_set_mat_row(lp, 7, 8, ind, val);
        
        /*
         * R8:  (Achocolatado |  g): 50*x2 + 50*x3 <= qtdAchocolatado
         * */
        GLPK.glp_set_row_name(lp, 1, "Achocolatado");
        GLPK.glp_set_row_bnds(lp, 1, GLPKConstants.GLP_DB, 0, constraintsValues[7]);
        GLPK.intArray_setitem(ind, 1, 2);
        GLPK.intArray_setitem(ind, 2, 3);
        GLPK.doubleArray_setitem(val, 1, 50);
        GLPK.doubleArray_setitem(val, 2, 50);
        GLPK.glp_set_mat_row(lp, 8, 2, ind, val);
        
        /*
         * R9:  (Limão |  un): 1*x8 <= qtdLimão
         * */
        GLPK.glp_set_row_name(lp, 1, "Limao");
        GLPK.glp_set_row_bnds(lp, 1, GLPKConstants.GLP_DB, 0, constraintsValues[8]);
        GLPK.intArray_setitem(ind, 1, 8);
        GLPK.doubleArray_setitem(val, 1, 1);
        GLPK.glp_set_mat_row(lp, 9, 1, ind, val);
        
        /*
         * R10:  (Manteiga |  g): 80*x2 + 80*x3 +160*x8 + 240*x9 <= qtdManteiga
         * */
        GLPK.glp_set_row_name(lp, 1, "Manteiga");
        GLPK.glp_set_row_bnds(lp, 1, GLPKConstants.GLP_DB, 0, constraintsValues[9]);
        GLPK.intArray_setitem(ind, 1, 2);
        GLPK.intArray_setitem(ind, 2, 3);
        GLPK.intArray_setitem(ind, 3, 8);
        GLPK.intArray_setitem(ind, 4, 9);
        GLPK.doubleArray_setitem(val, 1, 80);
        GLPK.doubleArray_setitem(val, 2, 80);
        GLPK.doubleArray_setitem(val, 3, 160);
        GLPK.doubleArray_setitem(val, 4, 240);
        GLPK.glp_set_mat_row(lp, 10, 4, ind, val);
        
        /*
         * R11:  (Mexirica |  un): 4*x9 <= qtdManteiga
         * */
        GLPK.glp_set_row_name(lp, 1, "Mexirica");
        GLPK.glp_set_row_bnds(lp, 1, GLPKConstants.GLP_DB, 0, constraintsValues[10]);
        GLPK.intArray_setitem(ind, 1, 9);
        GLPK.doubleArray_setitem(val, 1, 4);
        GLPK.glp_set_mat_row(lp, 11, 2, ind, val);
        
        /*
         * R12:  (Farinha de trigo |  g): 360*x1 + 240*x2 + 240*x3 + 240*x4 + 360*x5 + 
         * 360*x6 + 360*x7 + 240*x8 + 240*x9 <= qtdFarinha
         * */
        GLPK.glp_set_row_name(lp, 1, "Farinha de trigo");
        GLPK.glp_set_row_bnds(lp, 1, GLPKConstants.GLP_DB, 0, constraintsValues[11]);
        GLPK.intArray_setitem(ind, 1, 1);
        GLPK.intArray_setitem(ind, 2, 2);
        GLPK.intArray_setitem(ind, 3, 3);
        GLPK.intArray_setitem(ind, 4, 4);
        GLPK.intArray_setitem(ind, 5, 5);
        GLPK.intArray_setitem(ind, 6, 6);
        GLPK.intArray_setitem(ind, 7, 7);
        GLPK.intArray_setitem(ind, 8, 8);
        GLPK.intArray_setitem(ind, 8, 9);
        GLPK.doubleArray_setitem(val, 1, 360);
        GLPK.doubleArray_setitem(val, 2, 240);
        GLPK.doubleArray_setitem(val, 3, 240);
        GLPK.doubleArray_setitem(val, 4, 240);
        GLPK.doubleArray_setitem(val, 5, 360);
        GLPK.doubleArray_setitem(val, 6, 360);
        GLPK.doubleArray_setitem(val, 7, 360);
        GLPK.doubleArray_setitem(val, 8, 240);
        GLPK.doubleArray_setitem(val, 9, 240);
        GLPK.glp_set_mat_row(lp, 12, 8, ind, val);
        
        
        /*
         * R13:  (Açucar Cristal |  g):100*x4 + 100*x9 <= qtdAcucarCristal
         * */
        GLPK.glp_set_row_name(lp, 1, "Acucar cristal");
        GLPK.glp_set_row_bnds(lp, 1, GLPKConstants.GLP_DB, 0, constraintsValues[12]);
        GLPK.intArray_setitem(ind, 1, 4);
        GLPK.intArray_setitem(ind, 2, 9);
        GLPK.doubleArray_setitem(val, 1, 100);
        GLPK.doubleArray_setitem(val, 2, 100);
        GLPK.glp_set_mat_row(lp, 13, 2, ind, val);
        
        /*
         * R14:  (Oleo |  ml): 240*x4 + 240*x5 + 240*x6 + 240*x9 <= qtdOleo
         * */
        GLPK.glp_set_row_name(lp, 1, "Acucar refinado");
        GLPK.glp_set_row_bnds(lp, 1, GLPKConstants.GLP_DB, 0, constraintsValues[13]);
        GLPK.intArray_setitem(ind, 1, 4);
        GLPK.intArray_setitem(ind, 2, 5);
        GLPK.intArray_setitem(ind, 3, 6);
        GLPK.intArray_setitem(ind, 4, 9);
        GLPK.doubleArray_setitem(val, 1, 240);
        GLPK.doubleArray_setitem(val, 2, 240);
        GLPK.doubleArray_setitem(val, 3, 240);
        GLPK.doubleArray_setitem(val, 4, 240);

        GLPK.glp_set_mat_row(lp, 14, 4, ind, val);
    }
    
    // Define Objective Function
    public static void defineOF() {
        GLPK.glp_set_obj_name(lp, "z");
        GLPK.glp_set_obj_dir(lp, GLPKConstants.GLP_MAX);
        GLPK.glp_set_obj_coef(lp, 1, (40-cakeCost[0]));
        GLPK.glp_set_obj_coef(lp, 2, (30-cakeCost[1]));
        GLPK.glp_set_obj_coef(lp, 3, (44-cakeCost[2]));
        GLPK.glp_set_obj_coef(lp, 4, (34-cakeCost[3]));
        GLPK.glp_set_obj_coef(lp, 5, (25-cakeCost[4]));
        GLPK.glp_set_obj_coef(lp, 6, (25-cakeCost[5]));
        GLPK.glp_set_obj_coef(lp, 7, (35-cakeCost[6]));
        GLPK.glp_set_obj_coef(lp, 8, (28-cakeCost[7]));
        GLPK.glp_set_obj_coef(lp, 9, (32-cakeCost[8]));
    }
    
    public static void main(String[] args) {
        try {
        	createProblem("Maximização de lucros: Delícias Caseiras");
        	
        	defineColumns();
        	
        	double[] values = {1500,2500,3300,1400,500,600,700,800,900,1000,1001,1002,1003,1400};
        	setConstraintsValues(values);
        	
        	double[] ingredientsCosts = {4,8,14,21,4.78,6.60,7.42,8,47.12,13.15,11,12,13,14};
        	setCakesCosts(ingredientsCosts);
        	
        	defineConstraints();
        	
        	defineOF();
                    
            // Solve model
            parm = new glp_smcp();
            GLPK.glp_init_smcp(parm);
            int solution = calculateResult();
            
            // Retrieve solution
            if (solution == 0) {
                write_lp_solution(lp);
            } else {
                System.out.println("The problem could not be solved");
            }
            deleteProblem(lp);
        } catch (GlpkException ex) {
            ex.printStackTrace();
        }
    }
    private static void setCakesCosts(double[] ingredientsCosts) {
    	for(int i = 0; i < cakeCost.length; i++) {
    		cakeCost[i] = ingredientsCosts[i];
    	}
	}

	/**
     * write simplex solution
     * @param lp problem
     */
    static void write_lp_solution(glp_prob lp) {
        int i;
        int n;
        String name;
        double val;
        name = GLPK.glp_get_obj_name(lp);
        val = GLPK.glp_get_obj_val(lp);
        System.out.print(name);
        System.out.print(" = ");
        System.out.println(val);
        n = GLPK.glp_get_num_cols(lp);
        for (i = 1; i <= n; i++) {
            name = GLPK.glp_get_col_name(lp, i);
            val = GLPK.glp_get_col_prim(lp, i);
            System.out.print(name);
            System.out.print(" = ");
            System.out.println(val);
        }
    }
}
